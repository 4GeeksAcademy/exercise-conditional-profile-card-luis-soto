import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Condición para incluir o no la imagen de fondo
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Determinamos la clase para la posición de la barra de redes sociales
  const socialMediaClass =
    variables.socialMediaPosition === "position-left"
      ? "position-left"
      : "position-right";

  // Reseteamos el contenido de la tarjeta
  document.querySelector("#widget_content").innerHTML = `
        <div class="widget">
          ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name ? variables.name : "Lucy"}${
    variables.lastName ? variables.lastName : " Boilet"
  }</h1>
          <h2>${variables.role ? variables.role : "Web Developer"}</h2>
          <h3>${variables.country ? variables.country : "Miami"} ${
    variables.city ? variables.city : "USA"
  }</h3>          
          <ul class="${socialMediaClass}">
            ${
              variables.twitter
                ? `<li><a href="${variables.twitter}" target="_blank"><i class="fab fa-twitter"></i></a></li>`
                : ""
            }
            ${
              variables.github
                ? `<li><a href="${variables.github}" target="_blank"><i class="fab fa-github"></i></a></li>`
                : ""
            }
            ${
              variables.linkedin
                ? `<li><a href="${variables.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a></li>`
                : ""
            }
            ${
              variables.instagram
                ? `<li><a href="${variables.instagram}" target="_blank"><i class="fab fa-instagram"></i></a></li>`
                : ""
            }
          </ul>
        </div>
      `;

  // Establecemos el color de fondo
  document.querySelector(
    "#widget_content"
  ).style = `background-color: ${variables.backgroundColor}`;

  // Añadimos eventos de click en los labels para abrir el enlace en una nueva pestaña
  addLabelClickEvents();
}

function addLabelClickEvents() {
  const socialMediaLinks = {
    twitter: "twitter",
    github: "github",
    linkedin: "linkedin",
    instagram: "instagram"
  };

  Object.keys(socialMediaLinks).forEach(key => {
    const label = document.querySelector(`label[for="${key}"]`);
    const input = document.querySelector(`input[for="${key}"]`);

    if (label && input) {
      label.addEventListener("click", () => {
        const url = input.value.trim();
        if (url) {
          // Abre la URL en una nueva pestaña
          window.open(url, "_blank");
        } else {
          alert(`Por favor, ingresa una URL válida en el campo de ${key}.`);
        }
      });
    }
  });
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null,
    backgroundColor: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
