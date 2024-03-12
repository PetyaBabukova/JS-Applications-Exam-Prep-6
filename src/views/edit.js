import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const editTemplate = (item, submitHandler) => html`
    <section id="edit">
        <div class="form">
            <h2>Edit Product</h2>
            <form @submit=${submitHandler} class="edit-form">
                <input 
                type="text" 
                name="name"
                value=${item.name.trim()} 
                id="name" 
                placeholder="Product Name" 
                />
                <input 
                type="text" 
                name="imageUrl" 
                value=${item.imageUrl} 
                id="product-image" 
                placeholder="Product Image" 
                />
                <input 
                type="text" 
                name="category" 
                value=${item.category.trim()} 
                id="product-category" 
                placeholder="Category" 
                />
                <textarea 
                id="product-description" 
                name="description" 
                placeholder="Description" 
                rows="5" cols="50">
                ${item.description.trim()} 
                </textarea>
                <input 
                type="text" 
                name="price" 
                value=${Number(item.price.trim())} 
                id="product-price" 
                placeholder="Price" 
                />
                <button type="submit">post</button>
            </form>
        </div>
    </section>      
`;

export const editView = (ctx) => {
    const id = ctx.params.itemId;

    const submitHandler = (e) => {
        e.preventDefault();

        let isValidData = true;
        const data = Object.fromEntries(new FormData(e.currentTarget));

        Object.entries(data).forEach(([key, value]) => {
            if (value == '') {
                isValidData = false;
            }
        })

        if (!isValidData) {
            alert('All fields are required');
            return;
        }


        catalogService.edit(id, data)
            .then(() => ctx.page.redirect(`/details/${id}`))
            .catch(err => alert(err))

    }

    catalogService.getOne(id)
        .then(item => {
            ctx.render(editTemplate(item, submitHandler))

        })
}