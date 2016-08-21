
export class AssetRow {

    id :number;
    originalName: string;
    path:string;
    thumb:string;
    size: number;
    width: number;
    height: number;
    mime: string;
    orig_dimension: string;
    active: number;
    duration: number;
    type: string;
    time_from: number;
    time_to: number;
    created_user: number;
    created_time: number;
    metadata: string;


    static getInit(): AssetRow {
        return new AssetRow(
            {
                id : 0,
                originalName: 'string',
                path: 'string',
                thumb:'string',
                size: 0,
                width: 0,
                height: 0,
                mime: 'string',
                orig_dimension: 'string',
                active: 0,
                duration: 0,
                type: 'string',
                time_from: 0,
                time_to: 0,
                created_user: 0,
                created_time: 0,
                metadata: 'string'
            }
        );
    }


    constructor(obj: any) {
        for(var str in obj) this[str] = obj[str];
        // console.log('constructor AssetVO');
    }

}