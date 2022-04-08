export class UriBuilder {
    private uri: string = "";

    one(mapping: string, id: any): UriBuilder {
        this.uri += `/${mapping}/${id}`;
        return this;
    }

    all(mapping: string): UriBuilder {
        this.uri += `/${mapping}`;
        return this;
    }

    build(): string {
        return this.uri;
    }
}
