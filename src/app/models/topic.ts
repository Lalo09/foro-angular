export class Topic{
    constructor(
        public _id: string,
        public title: string,
        public content: string,
        public code: string,
        public lang: string,
        public date: any,
        public user: any,
        public comments: any
    ){}
}