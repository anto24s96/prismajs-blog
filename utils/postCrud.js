const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const slugify = require("slugify");

//funzione per creare il post
const createPost = (
    title,
    image,
    content,
    published = false,
    categoryId,
    tags
) => {
    const slug = slugify(title, {
        replacement: "-",
        lower: true,
        locale: "it",
        trim: true,
    });

    prisma.post
        .create({
            data: {
                title,
                slug,
                image,
                content,
                published,
                category: {
                    connect: { id: categoryId },
                },
                tags: {
                    connect: tags.map((tagId) => ({ id: tagId })),
                },
            },
        })
        .then((post) => {
            console.log("Post creato correttamente", post);
        })
        .catch((error) => {
            console.error("Errore nella creazione del post", error);
        });
};

//funzione per leggere il post tramite slug
const getPostBySlug = (slug) => {
    prisma.post
        .findUnique({
            where: { slug },
            include: {
                tags: true,
                category: true,
            },
        })
        .then((post) => {
            if (post) {
                console.log("Post trovato:", post);
            } else {
                console.log("Post non trovato con lo slug fornito:", slug);
            }
        })
        .catch((error) => {
            console.error("Errore durante il recupero del post:", error);
        });
};

//funzione per leggere tutti post
const getAllPosts = () => {
    prisma.post
        .findMany({
            include: {
                tags: true,
                category: true,
            },
        })
        .then((posts) => {
            if (posts.length > 0) {
                console.log(`Post trovati ${posts.length}`, posts);
            } else {
                console.log("Nessun post trovato");
            }
        })
        .catch((error) => {
            console.error("Errore nel recupero dei post:", error);
        });
};

//funzione per leggere solo i post pubblicati
const getPostPublished = () => {
    prisma.post
        .findMany({
            where: {
                published: true,
            },
            include: {
                tags: true,
                category: true,
            },
        })
        .then((posts) => {
            if (posts.length > 0) {
                console.log(`Trovato ${posts.length} post pubblici`, posts);
            } else {
                console.log("Nessun post pubblico trovato!");
            }
        })
        .catch((error) => {
            console.error("Errore nel recupero dei post pubblici", error);
        });
};

//funzione per aggiornare il post
const updatePost = (id, title, content, published, categoryId, tags) => {
    const updateData = {};

    if (title) {
        updateData.title = title;
        updateData.slug = slugify(title, {
            replacement: "-",
            lower: true,
            locale: "it",
            trim: true,
        });
    }
    if (content !== undefined) {
        updateData.content = content;
    }
    if (published !== undefined) {
        updateData.published = published;
    }
    if (categoryId) {
        updateData.category = {
            connect: { id: categoryId },
        };
    }
    if (tags) {
        updateData.tags = {
            set: tags.map((tagId) => ({ id: tagId })),
        };
    }

    prisma.post
        .update({
            where: { id },
            data: updateData,
        })
        .then((updatedPost) => {
            console.log("Post aggiornato:", updatedPost);
        })
        .catch((error) => {
            console.error("Errore nell'aggiornamento del post:", error);
        });
};

//funzione per eliminare il post
const deletePost = (id) => {
    prisma.post
        .delete({
            where: { id },
        })
        .then((post) => {
            console.log("Post eliminato", post);
        })
        .catch((error) => {
            console.error("Errore nell'eliminazione del post", error);
        });
};

module.exports = {
    createPost,
    getPostBySlug,
    getAllPosts,
    updatePost,
    deletePost,
    getPostPublished,
};
