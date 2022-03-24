import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
    {
        title: 'Jeans',
        Image: './prisma/jeans.webp',
        price: 60,
        stock: true,
        //@ts-ignore
        genre: 'Male'

    },
    {
        title: 'Cat Ears',
        Image: 'catears.jpg',
        price: 7,
        stock: false,
        //@ts-ignore
        genre: 'Female'
    },
    {
        title: 'Gucci Belt',
        Image: 'guccibelt.jpg',
        price: 240,
        stock: true,
        //@ts-ignore
        genre: 'Male'
    },
    {
        title: 'T-Shirt',
        Image: 'tshirt.jpg',
        price: 5,
        stock: true,
        //@ts-ignore
        genre: 'Male'
    },
    {
        title: 'Underwear',
        Image: "underwear.jpg",
        price: 3,
        stock: true,
        //@ts-ignore
        genre: 'Male'
    }
]


const users: Prisma.UserCreateInput[] = [
    {
        name: 'Elidon',
        email: 'elidon@live.eu',
        password: bcrypt.hashSync('elidon'),
        orders: {
            create: [
                { item: { connect: { title: 'Jeans' } }, quantity: 3 },
                { item: { connect: { title: 'Underwear' } }, quantity: 6 },
            ]

        },
        basket: {
            create: [{ item: { connect: { title: 'Jeans' } }, quantity: 1 }]
        }
    },
    {
        name: 'Nilson',
        email: 'nilson@live.eu',
        password: bcrypt.hashSync('nilson'),
        orders: {
            create: [
                { item: { connect: { title: 'T-Shirt' } }, quantity: 5 },
                { item: { connect: { title: 'Gucci Belt' } }, quantity: 2 },
                { item: { connect: { title: 'Jeans' } }, quantity: 3 },
            ]
        }
    }
]

async function initialDB() {
    for (const item of items) {
        await prisma.item.create({ data: item })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }
}


initialDB()

