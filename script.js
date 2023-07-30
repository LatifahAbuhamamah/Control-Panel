$(document).ready(function() {
    $('.direction-btn, .direction-btnn').click(function() {
        const direction = $(this).data('direction');
        sendDirection(direction);
    });

    function sendDirection(direction) {
        const validDirections = ["Backward", "Stop", "Left", "Right", "Forward"];
        if (!validDirections.includes(direction)) {
            return;
        }
        const xhr = new XMLHttpRequest();
        const url = `store_direction.php?direction=${encodeURIComponent(direction)}`;
        xhr.open("GET", url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    swal({
                        title: "Data successfully stored",
                        text: direction,
                        icon: "success",
                        buttons: {
                            ok: {
                                text: "OK",
                                value: "ok",
                                className: "swal-button--ok",
                            },
                            lastValue: {
                                text: "Last Value?",
                                value: "lastValue",
                                className:"swal-button--lastValue",
                            },
                        },
                    }).then((value) => {
                        if (value === "lastValue") {
                            window.location.href = "get_direction.php";
                        }
                    });
                } else {
                    swal({
                        title: "Error",
                        text: "Failed to store data",
                        icon: "error",
                        className:"swal-error--error",
                    });
                }
            }
        };
        xhr.send();
    }
});

