import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {

    @Field()
    userId: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    age: number;

    @Field({nullable: true})
    isSubscribed?: boolean

} 