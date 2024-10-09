const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = (...categoryNames) => {
    const categories = categoryNames.map((name) => ({ name }));

    prisma.category
        .createMany({
            data: categories,
            skipDuplicates: true,
        })
        .then((newCategories) => {
            console.log("Categorie create", newCategories);
        })
        .catch((error) => {
            console.error("Errore nella creazione delle categorie", error);
        });
};

module.exports = createCategory;
