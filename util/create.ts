import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const delay = () =>
    new Promise((res, rej) => {
        setTimeout(res, 100);
    });
const create1 = async (data) => {
    for (let item of data) {
        await prisma.product
            .create({ data: item })
            .then(() => console.log("done"));
    }
    console.log("created all");
};
const dataGenerate = (i) => {
    return {};
};

const deletem = async () => {
    await prisma.product.deleteMany();
    console.log("deleted all");
};
const main = async () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push(dataGenerate(i));
    }
    await deletem();
    await create1(data);
};
main();
