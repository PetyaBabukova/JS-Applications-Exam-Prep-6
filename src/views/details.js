import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const detailsTemplate = (item, isOwner, isLogged, canBuy, buyCount, ctx) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
                Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-price">
                Price: <span id="price-number">${item.price}</span>$</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Bought: <span id="buys">${buyCount}</span> times.</h4>
                    <span>${item.description}</span>
                </div>
            </div>
        ${isOwner
        ? html`
        <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="/delete/${item._id}" id="delete-btn">Delete</a>
        </div>
            `
        : nothing}

        ${isLogged && !isOwner && canBuy
        ? html`
        <div id="action-buttons">
            <a href="javascript:void(0)" id="buy-btn" @click=${(e) => ctx.onGo(e)}>Buy</a>
        </div>
        `
        : nothing}
            </div>
        </div>
    </section>
`;

export const detailsView = (ctx) => {
    let buyCount = 0;
    let canBuy = true;

    catalogService.getOne(ctx.params.itemId)
        .then(item => {
            const isOwner = item._ownerId === ctx.user?._id;
            const isLogged = !!ctx.user;

            if (ctx.user) {
                catalogService.getTotalBought(item._id).then(total => {
                    buyCount = total;

                    catalogService.didUserBuy(item._id, ctx.user._id)
                        .then(didBuy => {
                            canBuy = !didBuy;
                            ctx.render(detailsTemplate(item, isOwner, isLogged, canBuy, buyCount, ctx));
                        });
                });
            } else {
                ctx.render(detailsTemplate(item, isOwner, isLogged, canBuy, buyCount, ctx));
            }
        });

        ctx.onGo = (e) => {
            e.preventDefault();
            catalogService.buy(ctx.params.itemId).then(() => {
                buyCount += 1;
                canBuy = false;
                catalogService.getOne(ctx.params.itemId).then(item => {
                    const isOwner = item._ownerId === ctx.user?._id;
                    ctx.render(detailsTemplate(item, isOwner, !!ctx.user, canBuy, buyCount, ctx));
                });
            });
        };
        
};
