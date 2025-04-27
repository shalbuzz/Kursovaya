
var bootstrap = bootstrap; 

document.addEventListener("DOMContentLoaded", () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true
      const requiredFields = contactForm.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("is-invalid")
        } else {
          field.classList.remove("is-invalid")
          field.classList.add("is-valid")
        }
      })

      const emailField = contactForm.querySelector("#email")
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailField.value)) {
          isValid = false
          emailField.classList.add("is-invalid")
        }
      }

      if (isValid) {
        const formContainer = contactForm.parentElement
        formContainer.innerHTML = `
                    <div class="text-center py-5">
                        <div class="mb-4">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p class="lead">Your message has been sent successfully.</p>
                        <p>We'll get back to you as soon as possible.</p>
                    </div>
                `

        console.log("Form submitted successfully")
      }
    })
  }

  const subscribeModal = document.getElementById("subscribeModal")
  if (subscribeModal) {
    const modalForm = subscribeModal.querySelector("form")
    const submitButton = subscribeModal.querySelector(".btn-primary")

    submitButton.addEventListener("click", () => {
      let isValid = true
      const requiredFields = modalForm.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("is-invalid")
        } else {
          field.classList.remove("is-invalid")
          field.classList.add("is-valid")
        }
      })

      const emailField = modalForm.querySelector("#email")
      if (emailField && emailField.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(emailField.value)) {
          isValid = false
          emailField.classList.add("is-invalid")
        }
      }

      if (isValid) {
        const modalBody = modalForm.parentElement
        modalBody.innerHTML = `
                    <div class="text-center py-4">
                        <div class="mb-4">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p class="lead">Your subscription request has been received.</p>
                        <p>One of our representatives will contact you shortly to complete the setup process.</p>
                    </div>
                `

        const modalFooter = subscribeModal.querySelector(".modal-footer")
        modalFooter.innerHTML = `
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                `

        console.log("Subscription form submitted successfully")
      }
    })
  }

  const animateOnScroll = (elements, className) => {
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const triggerBottom = window.innerHeight * 0.8

      if (elementTop < triggerBottom) {
        element.classList.add(className)
      }
    })
  }

  const featureBoxes = document.querySelectorAll(".feature-box")
  if (featureBoxes.length > 0) {
    featureBoxes.forEach((box) => {
      box.style.opacity = "0"
      box.style.transform = "translateY(20px)"
      box.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

    const animateFeatures = () => {
      featureBoxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top
        const triggerBottom = window.innerHeight * 0.8

        if (boxTop < triggerBottom) {
          box.style.opacity = "1"
          box.style.transform = "translateY(0)"
        }
      })
    }

    animateFeatures()

    window.addEventListener("scroll", animateFeatures)
  }

  const timelineItems = document.querySelectorAll(".timeline-item")
  if (timelineItems.length > 0) {
    const animateTimeline = () => {
      timelineItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top
        const triggerBottom = window.innerHeight * 0.8

        if (itemTop < triggerBottom) {
          item.classList.add("visible")
        }
      })
    }

    animateTimeline()

    window.addEventListener("scroll", animateTimeline)
  }

  const animateSections = () => {
    animateOnScroll(document.querySelectorAll(".section-title"), "fade-in")
    
    animateOnScroll(document.querySelectorAll(".testimonial"), "slide-in-left")
    
    animateOnScroll(document.querySelectorAll(".tech-card"), "slide-in-right")
    
    animateOnScroll(document.querySelectorAll(".team-member"), "fade-in")
    
    animateOnScroll(document.querySelectorAll(".product-card"), "slide-in-up")
    
    animateOnScroll(document.querySelectorAll(".provider-card"), "slide-in-up")
  }

  animateSections()
  
  window.addEventListener("scroll", animateSections)

  const quantityBtns = document.querySelectorAll('.quantity-btn');
  if (quantityBtns.length > 0) {
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (this.classList.contains('minus') && currentValue > 1) {
          input.value = currentValue - 1;
        } else if (this.classList.contains('plus')) {
          input.value = currentValue + 1;
        }
      });
    });
  }

  
})
document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('playButton');
  
  if (playButton) {
    playButton.addEventListener('click', function (event) {
      event.preventDefault();
      
      const imageContainer = document.getElementById('imageContainer');
      const videoContainer = document.getElementById('videoContainer');
      const videoFrame = document.getElementById('videoFrame');
      
      if (imageContainer) imageContainer.classList.add('hidden');
      if (videoContainer) videoContainer.classList.remove('hidden');
      if (videoFrame) videoFrame.src = "https://www.youtube.com/embed/9no7Q4jYnsI?autoplay=1";
    });
  }
});