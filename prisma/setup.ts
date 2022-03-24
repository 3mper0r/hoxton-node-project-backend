import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
    {
        title: 'Jeans',
        Image: 'https://img01.ztat.net/article/spp-media-p1/bffec0d5b12b35a7bd12bf3426db55ba/5f529189e32546149da91fedc56a8623.jpg?imwidth=1800',
        price: 60,
        stock: true,
        //@ts-ignore
        genre: 'Male'

    },
    {
        title: 'Cat Ears',
        Image: 'https://m.media-amazon.com/images/I/61AETjxcFZS._SL1500_.jpg',
        price: 7,
        stock: false,
        //@ts-ignore
        genre: 'Female'
    },
    {
        title: 'Gucci Belt',
        Image: 'https://images.stockx.com/images/Gucci-Belt-Green-Red-Web-Double-G-Brass-Buckle-15W-Black-Studio-1.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&trimcolor=ffffff&updated_at=1610552221',
        price: 240,
        stock: true,
        //@ts-ignore
        genre: 'Male'
    },
    {
        title: 'T-Shirt',
        Image: 'https://www.tezenis.com/dw/image/v2/BCXQ_PRD/on/demandware.static/-/Sites-TEZ_EC_COM/default/dw52cd15a2/images/2MM15C9120-F.jpg?sw=600&sfrm=jpeg',
        price: 5,
        stock: true,
        //@ts-ignore
        genre: 'Male'
    },
    {
        title: 'Underwear',
        Image: "https://www.versace.com/dw/image/v2/ABAO_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dwf1337097/original/90_AU10026-A232741_A85K_10_GrecaBorderLowRiseTrunks-Boxers-versace-online-store_6_1.jpg?sw=450&sh=632&sm=fit&sfrm=jpg",
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
            create: {}
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

