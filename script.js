$(document).ready(function() {
    $('.direction-btn, .direction-btnn').click(function() {
        const direction = $(this).data('direction');
        sendDirection(direction);
    });

    function sendDirection(direction) {
        const validDirections = ["backward", "stop", "left", "right", "forward"];
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
                        timer: 2000,
                        button: false,
                        className:"Dire"
                    });
                    
                }
            }
        };
        xhr.send();
    }
});

