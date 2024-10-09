# Esercizio - prismajs-blog

Create un nuovo progetto Node.js (senza Express) ed installate la Prisma CLI e il Prisma Client.

Successivamente definite i modelli `Post`, `Category` e `Tag` nel file `schema.prisma`.

## Modello Post

Il Post deve contenere le seguenti proprietà:

-   `title`
-   `slug` (deve essere univoco)
-   `image` (non obbligatoria)
-   `content`
-   `published` (boolean)
-   `createdAt`
-   `updatedAt`

## Modelli Category e Tag

Per `Category` e `Tag` è sufficiente la proprietà `name`.

## Relazioni fra i modelli

-   **Category (one-to-many)**: Ogni Post deve avere una categoria associata, e una categoria può avere più Post associati.
-   **Tag (many-to-many)**: Ogni Post può avere uno o più tag associati, e ogni Tag può avere uno o più Post associati.

## Operazioni CRUD per il modello Post

Dopo aver definito i modelli, aggiungete le funzioni per creare una Categoria e un Tag ed implementate tutte le operazioni CRUD per il modello Post, ovvero:

1. Una funzione che consente di creare un Post.
2. Una funzione che permette di leggere un Post usando lo slug.
3. Una funzione che restituisce l'elenco di tutti i Post.
4. Una funzione che consente di modificare un Post.
5. Una funzione che elimina un Post.

## BONUS

-   Crea una funzione che restituisca solo i Post pubblicati.
-   Crea una funzione che restituisca solo i Post che contengono una determinata stringa nel contenuto.
