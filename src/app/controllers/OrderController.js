
import * as Yup from 'yup'
import Product from '../models/Products'
import Category from '../models/Category'
import Order from '../../schemas/Order'

class OrderController{
   async store(request,response){
        const schema = Yup.object().shape({
            products: Yup.array().required().of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
        })


        // if(!(await schema.isValid(request.body))){ // se der errado
        //     return response.status(400).json({error: "Make sure your correct"})
        // }
        try{
            await schema.validateSync(request.body,{abortEarly:false})
        } catch(err){
            return response.status(400).json({error: err.errors})
        }

        const productsId = request.body.products.map(product => product.id )
        const updatedProducts = await Product.findAll({
            where:{
                id: productsId
            },
            include:[{
                model:Category,
                as: 'category',
                attributes:['name']

            }]
        })

        const editedProduct = updatedProducts.map(product => {
        const productsIndex = request.body.products.findIndex(requestProduct => requestProduct.id === product.id)


            const newProduct = {
                id: product.id,
                name:product.name,
                price:product.price,
                category: product.category?.name ?? null,
                url: product.url,
                quantity:request.body.products[productsIndex].quantity,

            }
            return newProduct
        })

        const order = {
            user:{
                id: request.userId,
                name: request.userName,
            },
            products: editedProduct,
            status: 'Pedido realizado',
        }
        
        const orderResponse = await Order.create(order)
        console.log(orderResponse)

       return response.status(201).json(orderResponse)
    }
    
    async index(request,response){
        const orders = await Order.find()
        return response.json(orders)
    }

    async update(request,response){
        const schema = Yup.object().shape({
            status: Yup.string().required(),

        })
      try{
            await schema.validateSync(request.body,{abortEarly:false})
        } catch(err){
            return response.status(400).json({error: err.errors})
        }
        const {id} = request.params
        const {status} = request.body

        try{
            await Order.updateOne({_id: id},{status})
        }catch(error){
            return response.status(400).json({error: error.message})
        }
        return response.json({message: "Status was updated"})
    }
}
export default new OrderController()


