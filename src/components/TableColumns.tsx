//Define table columns and their properties
const columns = [
    {
        dataField: "id", 
        text: "Id", 
        sort: true, 
        headerStyle: () => {
            return { 
                width: "14%" 
            }
        }
    },
    {
        dataField: "title", 
        text: "Title", 
        sort: true
    },
    {
        dataField: "thumbnailUrl", 
        text: "Image", 
        formatter: imageFormatter, 
        headerStyle: () => {
            return { 
                width: "22%" 
            }
        }
    }
]

//Insert thumbnail-image url from column into HTML img element
function imageFormatter(url: string) {
    return (
        <img style={{width: "15vw"}} src={url} alt=""/>
    )   
}

export default columns