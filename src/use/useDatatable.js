export default function useDatatable() {
  function initDatatable() {
    if (!$.fn.dataTable.isDataTable("#order-listing")) {
      this.datatable = $("#order-listing").DataTable({
        dom: "lBfrtip",
        buttons: ["copy", "excel", "pdf"],
        paging: true,
        lengthChange: true,
        ordering: true,
        searching: true,
        autoWidth: false,
        info: false,
        responsive: {
          details: false,
        },
        scrollX: true,
      });
    } else {
      this.datatable = $("#order-listing").DataTable();
    }
  }
  return {
    initDatatable,
  };
}
