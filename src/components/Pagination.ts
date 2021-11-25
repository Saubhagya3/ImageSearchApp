import paginationFactory from 'react-bootstrap-table2-paginator';

//Define Bootstrap pagination and its options
const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: false,
    onPageChange: function (page, sizePerPage) {
        console.log("page", page)
        console.log("sizePerPage", sizePerPage)
    },
    onSizePerPageChange: function (page, sizePerPage) {
        console.log("page", page)
        console.log("sizePerPage", sizePerPage)
    }
})

export default pagination