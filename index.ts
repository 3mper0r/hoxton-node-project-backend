import express from "express";
import cors from 'cors'
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient({
    log: ['error', 'info', 'query', 'warn']
})

function createToken(id: number) {
    const token = jwt.sign({ id: id }, 'blablabla', { expiresIn: '90days' })
    return token
}

async function getUserFromToken(token: string) {
    const data = jwt.verify(token, 'blablabla')
    const user = await prisma.user.findUnique({
        //@ts-ignore
        where: { id: data.id },
        include: { orders: { include: { item: true } } }
    })
    return user
}

app.post('/sign-up', async (req, res) => {
    const { email, password, name } = req.body

    try {
        const hashedPassword = bcrypt.hashSync(password)
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
            include: { orders: { include: { item: true } } }
        })
        res.send({ user, token: createToken(user.id) })
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.post('/sign-in', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { orders: { include: { item: true } } }
        })
        //@ts-ignore
        const credentialMatches = bcrypt.compareSync(password, user.password)
        if (user && credentialMatches) {
            res.send({ user, token: createToken(user.id) })
        } else {
            throw Error('Your email or password are invalid')
        }
    } catch (err) {
        res.status(400).send({ error: 'Email or password are invalid' })
    }
})

app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ''

    try {
        const user = await getUserFromToken(token)
        res.send(user)
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

// app.get('/users', async (req, res) => {
//     const allUsers = await prisma.user.findMany()
//     try {

//         if (allUsers) {
//             res.send(allUsers)
//         } else {
//             res.send(404).send({ error: 'No user found' })
//         }
//     } catch (err) {
//         //@ts-ignore
//         res.status(400).send({ error: err.message })
//     }
// })

// app.get('/name/:id', async (req, res) => {
//     const id = Number(req.params.id)
//     const userName = await prisma.user.findUnique({ where: { id: id } })
//     try {


//         if (userName) {
//             res.send(userName)
//         } else {
//             res.send(404).send({ error: 'User not found' })
//         }
//     } catch (err) {
//         //@ts-ignore
//         res.status(400).send({ error: err.message })
//     }
// })
// app.get('/users/:name', async (req, res) => {
//     const name = req.params.name
//     const userName = await prisma.user.findFirst({
//         where: { name: name },
//         include: {
//             orders: {
//                 include: { item: true }
//             }
//         }
//     })
//     if (userName) {
//         res.send(userName)
//     } else {
//         res.status(404).send({ message: "User not found" })
//     }
// })


app.get('/users/:email', async (req, res) => {
    const email = req.params.email

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                orders: {
                    include: { item: true }
                }
            }
        })
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: 'User was not found' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.delete('/orders/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const order = await prisma.order.findUnique({ where: { id } })

        if (order) {
            await prisma.order.delete({ where: { id } })
            const user = await prisma.user.findUnique({
                where: { id: order.userId },
                include: { orders: { include: { item: true } } }
            })
            res.send(user)
        } else {
            res.status(404).send({ error: 'Order do not exist' })
        }
    } catch (err) {
        //@ts-ignore
        res.status(400).send({ err: err.message })
    }
})


app.listen(4000, () => {
    console.log(`Server running on port 4000: http://localhost:4000`);

})