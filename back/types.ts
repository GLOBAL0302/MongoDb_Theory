import {ObjectId} from "mongodb";

export type ProductMutation = {
    category: ObjectId
    title: string
    description: string
}