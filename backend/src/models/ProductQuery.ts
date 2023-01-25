export interface ProductQuery extends qs.ParsedQs {
    name: string,
    category: string,
    price: string,
    rating: string
}