import { Adapter } from '@sveltejs/kit';

export interface AdapterOptions {
	pages?: string;
	assets?: string;
	fallback?: string;
	precompress?: boolean;
	strict?: boolean;
    targetExtension: {
        old: string;
        new: string
    };
}

export default function plugin(options?: AdapterOptions): Adapter;
