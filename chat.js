$(function () {
    var username =  prompt('请输入昵称');
    $('.name').html(username)
    var input = $('.inputMessage');
	var memberArea = $('.members');
	var sendBtn = $("#btnSubmit");
    // 默认链接到渲染页面的服务器
    var socket = io();
    function scrollToBottom () {
        $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
    };

    socket.on('connect', function () {
        var name = $('.name').text() ||'匿名';
        socket.emit('join',name);
		
    })
    socket.on('sys', function (msg) {
        $('.messages').append('<p>'+msg+'</p>');
		
        // 滚动条滚动到底部
        scrollToBottom();
    });
    socket.on('new message', function (msg,user) {
        $('.messages').append('<p>'+user+'说：'+msg+'</p>');
        // 滚动条滚动到底部
        scrollToBottom();
    });
	
	socket.on('printMembers',function(memberArr){
		$('.members').empty();
		$('.members').append('<p>在线成员：'+memberArr.length+'人</p>');
		for(var i=0;i<memberArr.length;i++){
			var userName = memberArr[i];
			$('.members').append('<p>'+userName+'</p>');
		}
		scrollToBottom();
	});
	
    input.on('keydown',function (e) {
        if (e.which === 13) {
            var message = $(this).val();
            if (!message) {
                return ;
            }
            socket.send(message);
            $(this).val('');
        }
    });
	sendBtn.click(function(){
		//alert(111);
		//if (e.which === 13) {
            
        //}
		var message = input.val();
            if (!message) {
                return ;
            }
            socket.send(message);
            input.val('');
	});
});