export interface App {
    name?: string;
    version?: string;
    private?: boolean;
    location: string;
}

export interface PromptChoice {
    title: App['name'];
    value: App['name'];
}
