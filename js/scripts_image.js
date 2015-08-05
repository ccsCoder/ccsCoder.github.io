/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(e) {
    // carousel demo
    $('#myCarousel').carousel();
    console.log("What");
    $('#socialContent').share({
                    networks: ['facebook','googleplus',
                        'twitter','linkedin','tumblr','email','stumbleupon']
     }); 
});

