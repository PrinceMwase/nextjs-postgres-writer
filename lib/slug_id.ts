export default function SlugID(url: string){
    const {searchParams} = new URL(url)

    let stringified = searchParams.get('slug') ?? ''

    return {
        stringified,
        id: (function (): {id: number} {
            return {id:parseInt(stringified)}
        })
    }
}