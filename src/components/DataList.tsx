import React, { useState, useEffect } from 'react'
import url from './Url'
import columns from './TableColumns';
import pagination from './Pagination';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ImageViewer from 'react-simple-image-viewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

function DataList() {
    
    //Data interface
    interface Info {
        albumId: number,
        id: number,
        title: string,
        url: string,
        thumbnailUrl: string
    }

    //State Hooks
    const [ data, setData ] = useState<Array<Info>>([]);
    const [ currentImage, setCurrentImage ] = useState(0);
    const [ isViewerOpen, setIsViewerOpen ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

    //Initialize Bootstrap table search
    const { SearchBar } = Search;

    //Get and set API data
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await fetch(url)

            if (fetchedData.status === 500) {
                setHasError(true);
                return
            }

            const newData = await fetchedData.json()

            setData(newData)
        }
        fetchData()
    }, [])

    //Create image list array for ImageViewer function
    const imageList = data.map(item => {
        return(item.url)
    })
    
    //Handle table row click event
    const tableRowEvents = {
        onClick: (e: any, row: any) => {
            console.log(row)
            openImageViewer(row.id - 1)  //Row-id starts from 1, but we need image from imageList[0]
        }
     }

    //Handle image open
    const openImageViewer = (index: number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    };

    //Handle image close
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div style={{ marginLeft: "3%", marginRight: 0}}>
            { hasError ? <h3>Can't reach the server...</h3> : null }
            <ToolkitProvider
                keyField="id"
                data={ data }
                columns={ columns }
                search
            >
                {
                    props => (
                        <div>
                            <h3>Image Search App</h3>
                            <SearchBar { ...props.searchProps } style={{width: "80vw"}}/>
                            <hr />
                            <BootstrapTable
                                { ...props.baseProps }
                                bootstrap4
                                rowEvents={ tableRowEvents }
                                striped={true} 
                                hover={true}
                                pagination={pagination}
                            />
                            {isViewerOpen && (
                                <ImageViewer
                                    src={ imageList }
                                    currentIndex={ currentImage }
                                    disableScroll={ false }
                                    closeOnClickOutside={ true }
                                    backgroundStyle={{
                                        backgroundColor: "rgba(0,0,0,0.7)"
                                    }}
                                    onClose={ closeImageViewer }
                                />
                            )}
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default DataList