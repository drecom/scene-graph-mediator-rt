export default interface Schema {
    constructorName: string;
    name: string | null;
    children: Schema[];
}
