import { bd } from "../../utils/firebaseConfig";
import firebase from "firebase/app";
import "../Navbar/Navbar.css";
import Navbar from "../Navbar/Navbar";
import Cargando from "../cargando/Cargando";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "./Perfil.css";
import labelsList from "../inputTags/labelsList";

import React from "react";
import { useHistory } from "react-router-dom";

const Perfil = ({ user }) => {
  const countries = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia, Plurinational State of",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Democratic Republic of the Congo",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    PF: "French Polynesia",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    HT: "Haiti",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Republic of Macedonia",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    MX: "Mexico",
    FM: "Micronesia, Federated States of",
    MD: "Republic of Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RO: "Romania",
    RU: "Russian",
    RW: "Rwanda",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syria",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela, Bolivarian Republic of",
    VN: "Viet Nam",
    VI: "Virgin Islands",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
  };
  const history = useHistory();
  const currentUser = useContext(UserContext).user;
  const [comment, setComment] = useState("");
  const [refreshComments, setRefreshComments] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [userRanking, setUserRanking] = useState(0);
  const [refreshRanking, setRefreshRanking] = useState(0);
  const [loadingRanking, setLoadingRanking] = useState(false);

  const handleConfig = () => {
    history.push("/config");
  };

  const getRanking = async () => {
    setLoadingRanking(true);
    const userRef = await bd.collection("users").doc(user.id);
    const userDoc = await userRef.get();
    setUserRanking(userDoc.data().ranking);
    setLoadingRanking(false);
  };

  function validarEditar() {
    if (currentUser && currentUser.id === user.id) {
      return (
        <div className="editar-boton register-button" onClick={handleConfig}>
          Editar Perfil
        </div>
      );
    } else {
      return null;
    }
  }

  function validarNumCorreo() {
    if (currentUser && currentUser.id === user.id) {
      return (
        <>
          <div className="correo-user">
            <div className="titles">Correo electrónico</div>
            <div className="sub">{user.email}</div>
          </div>
          <div className="line"></div>
          <div className="number-user">
            <div className="titles">Número telefónico</div>
            <div className="sub">
              {user.phone ? (
                user.phone
              ) : (
                <p className="altText">No se especificó número de teléfono</p>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  const handleAgenda = () => {
    history.push(`/agendar/${user.id}`);
  };

  function agendarCita() {
    if (
      currentUser &&
      currentUser.id !== user.id &&
      currentUser.role === "usuario"
    ) {
      return (
        <>
          <div className="agendarCita" onClick={handleAgenda}>
            <p>Agendar Cita</p>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  const recalculateRanking = async () => {
    const userRef = bd.collection("users").doc(user.id);
    const userDoc = await userRef.get();
    const feedback = userDoc.data().feedback;
    var total = 0;
    feedback.forEach((review) => (total = total + Number(review.rating)));
    console.log(total);
    let ranking = total / feedback.length;
    console.log(ranking);
    await bd.collection("users").doc(user.id).update({ ranking: ranking });
    setRefreshRanking(refreshRanking + 1);
  };

  const addComment = async () => {
    if (comment) {
      setLoadingComments(true);
      var newComment = {
        author: currentUser.id,
        authorName: currentUser.name,
        review: comment,
        rating: Number(rating),
      };

      if (
        comments.length > 0 &&
        comments.find((review) => review.author === currentUser.id)
      ) {
        if (
          window.confirm(
            "Usted ya ha escrito una reseña para este especialista antes.\nSi escribe otra reseña, sobreescribirá su comentario anterior.\n¿Está seguro que quiere escribir una nueva reseña?"
          )
        ) {
          await getComments();
          const commentIndex = comments
            .map((review) => {
              return review.author;
            })
            .indexOf(currentUser.id);
          comments[commentIndex] = newComment;
          const profileUser = bd.collection("users").doc(user.id);
          await profileUser.update({ feedback: comments });
          await recalculateRanking();
          setRefreshComments(refreshComments + 1);
        }
      } else {
        const profileUser = bd.collection("users").doc(user.id);
        await profileUser.update({
          feedback: firebase.firestore.FieldValue.arrayUnion(newComment),
        });
        await recalculateRanking();
        setRefreshComments(refreshComments + 1);
      }
      setLoadingComments(false);
      setComment("");
      setRating(0);
    }
  };

  const handleNumChange = (event) => {
    let { value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setRating(value);
  };

  function addNewComment() {
    if (currentUser === null || currentUser.id === user.id) {
      return null;
    } else {
      return (
        <>
          <div className="review-card">
            <div className="titles">
              Escribir una reseña de este especialista{" "}
            </div>
            <div className="line"></div>
            <br />
            <br />
            <div className="caja">
              <textarea
                name="review"
                disabled={loadingComments}
                placeholder="¡Escribe tu reseña aquí!"
                className="review-input"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
              <div className="caja-review">
                <div className="caja-rating">
                  <label htmlFor="rating" className="text-comment">
                    Clasificación:{" "}
                  </label>
                  <div className="stars">
                    <input
                      className="rating-input"
                      type="number"
                      disabled={loadingComments}
                      name="rating"
                      value={Number(rating)}
                      onChange={handleNumChange}
                      min="0"
                      max="5"
                      step="0.5"
                    />
                    <span className="star">★</span>
                    <span className="rating-text">/</span>
                    <span className="stars-container star-100">★★★★★</span>
                  </div>
                </div>
                <button
                  className="enviar-button"
                  onClick={addComment}
                  disabled={loadingComments}
                  style={{ background: loadingComments ? "#CCC" : "#EE9D6B" }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  const getComments = async () => {
    setLoadingComments(true);
    const userRef = await bd.collection("users").doc(user.id);
    const userDoc = await userRef.get();
    setComments(userDoc.data().feedback);
    setLoadingComments(false);
  };

  useEffect(() => {
    getComments();
  }, [refreshComments]);

  useEffect(() => {
    getRanking();
  }, [refreshRanking]);

  function getStars(ranking) {
    const percentage = (ranking * 100) / 5;

    if (percentage < 10) {
      return "stars-container stars-0";
    } else if (percentage >= 10 && percentage < 20) {
      return "stars-container stars-10";
    } else if (percentage >= 20 && percentage < 30) {
      return "stars-container stars-20";
    } else if (percentage >= 30 && percentage < 40) {
      return "stars-container stars-30";
    } else if (percentage >= 40 && percentage < 50) {
      return "stars-container stars-40";
    } else if (percentage >= 50 && percentage < 60) {
      return "stars-container stars-50";
    } else if (percentage >= 60 && percentage < 70) {
      return "stars-container stars-60";
    } else if (percentage >= 70 && percentage < 80) {
      return "stars-container stars-70";
    } else if (percentage >= 80 && percentage < 90) {
      return "stars-container stars-80";
    } else if (percentage >= 90 && percentage < 100) {
      return "stars-container stars-90";
    } else {
      return "stars-container stars-100";
    }
  }

  return (
    <>
      <Navbar />
      {!!user ? (
        <section className="main-RegistroUser">
          <div className="todo-user">
            <div className="encabezado1">
              <img src={user.img} alt="Not found" className="imagen-user" />
              <div className="nombre-user">{user.name}</div>
              {validarEditar()}
              {agendarCita()}
            </div>

            <div className="relleno">
              {user.status === "standby" ? (
                <>
                  <div className="correo-user">
                    <div className="sub estado-perfil">
                      ¡La evaluación de sus credenciales sigue en pie, mientras
                      tanto, puede ir configurando su perfil!
                    </div>
                  </div>
                  <div className="line"></div>
                </>
              ) : null}
              {validarNumCorreo()}
              <div className="line"></div>
              <div className="pais-user">
                <div className="titles">País</div>
                <div className="sub">
                  {user.country ? (
                    countries[user.country]
                  ) : (
                    <p className="altText">No se especificó país</p>
                  )}
                </div>
              </div>
              <div className="line"></div>
              <div className="ranking-user">
                <div className="titles">Ranking</div>
                <div className="sub">
                  {loadingRanking ? (
                    <span className="altText">Cargando...</span>
                  ) : (
                    <span className={getStars(userRanking)}>★★★★★</span>
                  )}
                </div>
              </div>
              <div className="line"></div>
            </div>
            <div className="info-edu">
              <div className="edu-box">
                <div className="titles" id="titles-ed1">
                  Áreas de
                  <br />
                  atención
                </div>
                <div className="line"></div>
                <div className="text-info especialidades-perfil">
                  {user.specialty.length !== 0 ? (
                    <ul className="lista-espe-perfil">
                      {labelsList(user.specialty).map((esp) => {
                        return <li key={esp}>{esp}</li>;
                      })}
                    </ul>
                  ) : (
                    <p className="altText">
                      No se especificaron especialidades
                    </p>
                  )}
                </div>
              </div>

              <div className="edu-box">
                <div className="titles" id="titles-ed">
                  Formación Académica
                </div>
                <div className="line"></div>
                <div className="text-info">
                  {user.education ? (
                    user.education
                  ) : (
                    <p className="altText">
                      No se especificó información sobre su educación
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="about-user">
              <div className="info">
                <div className="titles">Sobre mí</div>
                <div className="line"></div>

                <div className="text-info">
                  {user.info ? (
                    user.info
                  ) : (
                    <p className="altText">No se especificó una descripción</p>
                  )}
                </div>
              </div>
            </div>
            {addNewComment()}

            <div className="all-comments">
              <div className="titles">Sección de comentarios</div>
              <div className="line"></div>
              <br />
              <br />
              <div className="grupo-comentario">
                {loadingComments ? (
                  <div className="altText">Cargando comentarios...</div>
                ) : comments.length > 0 ? (
                  comments.map((review) => {
                    return (
                      <div className="comment">
                        <div className="commenter">{review.authorName}</div>
                        <div className="line"></div>
                        <span className="text-comment">Clasificación: </span>
                        <div className={getStars(review.rating)}>★★★★★</div>
                        <div className="text-comment">
                          <p>{review.review}</p>
                        </div>
                        <br />
                      </div>
                    );
                  })
                ) : (
                  <div className="altText">
                    Este especialista aún no tiene comentarios.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Cargando />
      )}
    </>
  );
};

export default Perfil;