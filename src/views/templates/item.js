import { html } from '../../../node_modules/lit-html/lit-html.js';

export const itemTemplate = (item) => html`
    <div class="product">
        <img src=${item.imageUrl} alt="example1" />
        <p class="title">
        ${item.name}
        </p>
        <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </div>
`;