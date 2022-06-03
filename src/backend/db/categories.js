import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Shirt",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
    image: "https://bit.ly/3uSLmR4",
    path: "/products",
  },
  {
    _id: uuid(),
    categoryName: "Shoes",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    image: "https://bit.ly/3sBdN3l",
    path: "/products",
  },
  {
    _id: uuid(),
    categoryName: "Saree",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    image: "https://bit.ly/3gGa4fh",
    path: "/products",
  },
  {
    _id: uuid(),
    categoryName: "Activewear",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    image: "https://bit.ly/3oInQm2",
    path: "/products",
  },
  {
    _id: uuid(),
    categoryName: "Jeans",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    image: "https://bit.ly/3uKE1mB",
    path: "/products",
  },
];
