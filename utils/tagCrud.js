const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTag = (name) => {
    prisma.tag
        .create({
            data: {
                name,
            },
        })
        .then((tag) => {
            console.log("Tag creato correttamente", tag);
        })
        .catch((error) => {
            console.error("Errore nella creazione del tag", error);
        });
};

module.exports = createTag;
