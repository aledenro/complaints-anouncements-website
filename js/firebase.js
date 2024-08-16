firebaseConfig = {
  type: "service_account",
  project_id: "compliants-anouncements-web",
  private_key_id: "f2f272ca8a0fd430ca6725e2116f05489771f9a0",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDcGMVvKZo3GcL\n3Q51pu1HAYDM6flPEiftskh8JAZdqBkYocRcmim9DFxBt4B3TeACl2wENc8JTW1W\nZRbTA4Fmj+mdEkesOPQVMMDDnUvULANW+fVTIX25rPT34JOvFUeuccrQo1clIXEw\nYQa+npP41nYNsclGHWLsWoxzyDeHAr/glatFBoveO85FrGt5sqkAQRuCV75GAL6f\nlNkWApXTq3uqAS5y4LkoPZaLFh5XNPt4TB14KRjZ1+LHHdirIkzK/qhtu1xi0KiV\njEcIlEUoJkGMMVgL8DMPltYRev1dEr55GMVEfbjLCCVPGG9GHkJIcFwgI9rz+V0H\n8ipUkbLPAgMBAAECggEAE86mHCPccbA0uV0UBBSA47thRGNKIxth9JMnCX3VL1TE\nBl0Ou5vcMw63ouloGa9Izrpt9hdF/llchW8FWyl1yeE3+fVKUkgLZMJmJu0gLEax\np/T5Sg2Q4mqHAUA/d3UeqK1bsr17LYYwJIkQ1+zWble96zFjhrmftviOV4WpKwOM\nwJAzJARKF4qHxPEdBxjXl9Aywl8qRjR5zdor+CDhjFLQmQmI4XbIkKsTbiP5UHFX\nk5u06+jfL3/5vC65Qb+d6hdsKa/EsWOCxDG/ZgaEsynE/3B8NGjOZnGJL8/FkpCg\nmhHXG8kfU7bhJX6lAamzGKc1zDKAts1+IB9rigvIoQKBgQD3eMRzzGN5OVVVH2EH\n+QAl3+nj8NjDpN1g149w4jWxkXfF/sTQeb/zqkCratZiw17//4Xf4W7qtzV40p0U\nnoSL/VmusM1nVQfFXbTVRn9d67iALbBPghsObazXwls+Q4CI/tD72u5sX/PSnO7J\nTVeocvM2dip3Es3vgMMxOPBphwKBgQDKLJRA8cKE99HrBljhOHk2F8rSpE7Gnwcn\nHYJyNjv74JkeR3uAxvVfEShQSr7xwJjaXZdGd+axeWM7xmNq/2amc46wJ+0r+JQU\nBkGHgUGVsTHam0RhiY/3aZE0misGUEs+2u2g9P993+6/1Y2IDQWgmpV9GfeovlG0\nE2tESV4eeQKBgH8yVp9CXZqQSnjvIPttE5NkDJ65S2D720GMalDWJEz5fPuKoHSb\nL3s5dfXlev3Wd3zTRGc3QsBnnJdWgaB4fZ5KgQ8WFu1WuiDKskiw7IRExVc0pJup\nPujinGVlo2pUXbuMZbQd6lBP3U3SlbVoCHcvZi0G/Xqocqr4ntss7fz/AoGAfWKa\na5DEh/y+Rtl/4+ZHXmHxGyRl6s8T+5FUpoq2Nuc7b0j78ojyAoy8iNdihsJgygUD\nXePcwjK7dYX7gI93VUITu3J3qC6Zf7XFjEmAqFrlxWNITImpLNNfB9WZW2gO0qOq\nfomTrrhj9Lt39GnHFKzqi1TAgPnP6DOm8gniglkCgYEAg5C0ax2ONIxlxNuERRsU\ni7IJK8Bswfs510VEcqxR3Bu9eQr5XrGHAwmSbHKGt9Q6I+N7hVB2pFS9KE0TKe0N\nO3WXaRCbJ4vYWnVGZxcj1kIO0osCFu2aaKcOZqReHQFI9+j3Ao4dPkX3zEAuZ3rf\nN47jSssWj6feWpJ1Emgh6h0=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-86wdk@compliants-anouncements-web.iam.gserviceaccount.com",
  client_id: "114793283298481287828",
  storageBucket: "compliants-anouncements-web.appspot.com",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-86wdk%40compliants-anouncements-web.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

async function uploadImage(id_anuncio, fileItem) {
  try {
    const storageRef = firebase.storage().ref(`imgs/anuncio${id_anuncio}`);
    const uploadTaskSnapshot = await storageRef.put(fileItem);
    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen o obtener la URL:", error);
    throw error;
  }
}
