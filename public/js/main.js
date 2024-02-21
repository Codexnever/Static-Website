(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
      setTimeout(function () {
          if ($('#spinner').length > 0) {
              $('#spinner').removeClass('show');
          }
      }, 1);
  };
  spinner();
  
  
  // Initiate the wowjs
  new WOW().init();


  // Sticky Navbar
  $(window).scroll(function () {
      if ($(this).scrollTop() > 45) {
          $('.navbar').addClass('sticky-top shadow-sm');
      } else {
          $('.navbar').removeClass('sticky-top shadow-sm');
      }
  });
  
  
  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";
  
  $(window).on("load resize", function() {
      if (window.matchMedia("(min-width: 992px)").matches) {
          $dropdown.hover(
          function() {
              const $this = $(this);
              $this.addClass(showClass);
              $this.find($dropdownToggle).attr("aria-expanded", "true");
              $this.find($dropdownMenu).addClass(showClass);
          },
          function() {
              const $this = $(this);
              $this.removeClass(showClass);
              $this.find($dropdownToggle).attr("aria-expanded", "false");
              $this.find($dropdownMenu).removeClass(showClass);
          }
          );
      } else {
          $dropdown.off("mouseenter mouseleave");
      }
  });
  
  
  // Back to top button
  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });
  $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
  });


  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 2000
  });


  // Modal Video
  $(document).ready(function () {
      var $videoSrc;
      $('.btn-play').click(function () {
          $videoSrc = $(this).data("src");
      });
    

      $('#videoModal').on('shown.bs.modal', function (e) {
          $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
      })

      $('#videoModal').on('hide.bs.modal', function (e) {
          $("#video").attr('src', $videoSrc);
      })
  });


  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav : false,
      responsive: {
          0:{
              items:1
          },
          768:{
              items:2
          },
          992:{
              items:3
          }
      }
  });
  
})(jQuery);


// Plexus Animation
const canvas = document.getElementById('plexusCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numNodes = 50;
const nodes = [];

class Node {
  constructor(x, y, radius, speedX, speedY, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
  }

  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, this.color);
      ctx.fillStyle = gradient;
      ctx.fill();
  }

  update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width + 50) {
          // If node goes beyond the right edge of canvas, reset its x-coordinate to -50
          this.x = -50;
      }
  }
}

function createNodes() {
  for (let i = 0; i < numNodes; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2 + 1; // Random radius between 1 and 3
      const speedX = 0.2; // Fixed speed to move from left to right
      const speedY = (Math.random() - 0.5) * 0.5; // Random speed between -0.5 and 0.5 for vertical movement
      const color = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random color
      nodes.push(new Node(x, y, radius, speedX, speedY, color));
  }
}

function drawNodes() {
  nodes.forEach(node => {
      node.draw();
  });
}

function drawLines() {
  for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 160) { // Adjust this value to change the connectivity threshold
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
              ctx.lineWidth = 1; // Increase line thickness
              ctx.stroke();
          }
      }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
  drawNodes();
  nodes.forEach(node => {
      node.update();
  });
  requestAnimationFrame(animate);
}

createNodes();
animate();
