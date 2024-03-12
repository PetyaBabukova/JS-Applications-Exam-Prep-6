import { html } from '../../node_modules/lit-html/lit-html.js';
import * as catalogService from '../services/catalogService.js';

const createTemplate = (SubmitHandler) => html`
    <section id="create">
        <div class="form">
            <h2>Add Product</h2>
            <form @submit=${SubmitHandler} class="create-form">
                <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Product Name" 
                />
                <input 
                type="text" 
                name="imageUrl" 
                id="product-image" 
                placeholder="Product Image" 
                />
                <input 
                type="text" 
                name="category" 
                id="product-category" 
                placeholder="Category" 
                />
                <textarea id="product-description" 
                name="description" 
                placeholder="Description" 
                rows="5" cols="50"
                ></textarea>
                <input 
                type="text" 
                name="price" 
                id="product-price" 
                placeholder="Price" 
                />
                <button type="submit">Add</button>
            </form>
        </div>
    </section>
`;

export const createView = (ctx) => {
    const SubmitHandler = (e) => {
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
            return
        }


        catalogService.create(data)
            .then(() => ctx.page.redirect('/catalog'))
            .catch(err => alert(err))

    }

    ctx.render(createTemplate(SubmitHandler))
};


// export const createView = (ctx) => {
//     const SubmitHandler = (e) => {
//         e.preventDefault();

//         let isValidData = true;
//         const formData = Object.fromEntries(new FormData(e.currentTarget));

//         Object.entries(formData).forEach(([key, value]) => {
//             if (value == '') {
//                 isValidData = false;
//             }
//         })

//         if (!isValidData) {
//             alert('All fields are required');
//             return
//         } else {
//             const data = {
//                 category: formData.category,
//                 imageUrl: formData['image-url'],
//                 description: formData.description,
//                 moreInfo: formData['additional-info']
//             }

//             catalogService.create(data)
//                 .then(() => {
//                     ctx.page.redirect('/catalog')
//                 })
//                 .catch(err => alert(err))
//         };

//     }

//     ctx.render(createTemplate(SubmitHandler))
// }