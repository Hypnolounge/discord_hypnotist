export { };


declare global {
    interface HLApp {
        id: string;
        name: string;
        description: string;
        image: string;
        route: string;
        permissions: string[];
    }
}