$(document).ready(function () {



    /* 데이터 추가 */
    $("#btn-market-save").click(function () {


        var _this = $(this)
        $(this).prop("disabled", true);
        $(this).text("로딩중...");

        var date = $("input[name*='date']").val();
        var count = $("input[name*='count']").val();
        var mcode = $("select[name*='mcode']").val();

        $.ajax({
            url: '/internal/result',
            type: "POST",
            crossOrigin: true,
            data: {
                'date': date,
                'mcode': mcode,
                'count': count,
            },
            success: function (data, textStatus, xhr) {

                /* 조회된 개수가 0개 일경우 200을 리턴합니다. */
                if (xhr.status == 204) {
                    location.reload();
                } else {
                    swal({
                        type: 'warning',
                        title: '주의',
                        text: "조회된 결과수가 0개이므로 저장되지 않았습니다.",
                    })
                }

                _this.prop("disabled", false);
                _this.text("조회하기");

            },
            error: (msg) => {
                _this.prop("disabled", false);
                _this.text("조회하기");
                showError(msg)
            },
        })
    });

    /* 데이터 삭제 */
    $(".btn-delete-history").click(function () {

        $.ajax({
            url: '/internal/delete',
            type: "DELETE",
            data: {
                'id': $(this).data("id"), //id값
            },
            success: function () {
                location.reload();
            },
            error: (msg) => showError(msg),
        })


    });
});


function showError(msg) {
    swal({
        type: 'error',
        title: '에러코드',
        text: JSON.stringify(msg),
    })
}
