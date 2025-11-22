# MCL TRANS SRL - Website

Site web professionnel pour MCL TRANS SRL, entreprise de transport national et international.

## 🚀 Caractéristiques

- **Design Moderne**: Interface responsive et moderne
- **Multi-langue**: Support pour Français, Nederlands, English, Deutsch
- **SEO Optimisé**: Meta tags complets, structured data, Open Graph
- **Sécurisé**: Headers de sécurité, protection XSS, validation des formulaires
- **Performance**: Code optimisé, lazy loading, animations fluides
- **Accessible**: Conforme aux standards WCAG, navigation au clavier
- **Responsive**: Compatible mobile, tablette et desktop

## 📋 Technologies Utilisées

- HTML5 sémantique
- CSS3 avec variables CSS et Flexbox/Grid
- JavaScript Vanilla (ES6+)
- Système de traduction multi-langue (FR, NL, EN, DE)
- SEO avec JSON-LD structured data
- Sécurité avec CSP headers

## 🔒 Sécurité

Le site implémente plusieurs mesures de sécurité:

- Content Security Policy (CSP)
- Protection XSS avec sanitization
- Honeypot pour spam protection
- Validation côté client et serveur recommandée
- HTTPS recommandé en production

## 🌐 Multi-langue

Le site supporte 4 langues:
- **Français** (FR) - Langue par défaut
- **Nederlands** (NL) - Néerlandais
- **English** (EN) - Anglais
- **Deutsch** (DE) - Allemand

### Fonctionnalités:
- Sélecteur de langue dans la barre de navigation
- Sauvegarde de la préférence linguistique dans localStorage
- Traduction dynamique de tout le contenu
- Messages de validation de formulaire traduits

### Ajouter une nouvelle langue:

1. Ouvrez `translations.js`
2. Ajoutez un nouvel objet de langue (ex: `es` pour espagnol)
3. Traduisez toutes les clés
4. Ajoutez l'option dans le HTML:
```html
<li><a href="#" data-lang="es" class="lang-option">Español</a></li>
```

## 🎨 Sections

1. **Hero** - Bannière d'accueil avec call-to-action
2. **À propos** - Présentation de l'entreprise
3. **Services** - Transport national et international
4. **Atouts** - Points forts de l'entreprise
5. **Contact** - Formulaire et coordonnées

## 📱 Responsive

Le site est entièrement responsive avec breakpoints:
- Mobile: < 480px
- Tablette: 481px - 768px
- Desktop: > 768px

## ⚙️ Installation

1. Clonez ou téléchargez les fichiers
2. Ouvrez `index.html` dans votre navigateur
3. Pour un serveur local:
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server
   ```

## 🌐 Déploiement

Pour le déploiement en production:

1. **Configuration serveur**:
   - Activez HTTPS
   - Configurez les headers de sécurité (voir `.htaccess`)
   - Compressez les fichiers (Gzip/Brotli)

2. **Optimisation**:
   - Minifiez HTML, CSS, JS
   - Optimisez les images
   - Activez le cache navigateur

3. **Backend pour formulaire**:
   - Configurez un endpoint pour le formulaire
   - Ajoutez reCAPTCHA si nécessaire
   - Configurez l'envoi d'emails

## 📧 Configuration du Formulaire

Le formulaire nécessite un backend. Options recommandées:

1. **PHP**: Utilisez PHPMailer ou similaire
2. **Node.js**: Utilisez Nodemailer
3. **Service tiers**: FormSpree, EmailJS, etc.

Exemple avec EmailJS (à ajouter dans `script.js`):
```javascript
// Remplacez la fonction simulateFormSubmission par:
emailjs.send("service_id", "template_id", formData)
    .then(() => { /* success */ })
    .catch((error) => { /* error */ });
```

## 🎯 SEO

Le site inclut:
- Meta tags optimisés
- Structured data (JSON-LD)
- Sitemap recommandé
- robots.txt recommandé
- Open Graph pour réseaux sociaux
- Canonical URLs

## ♿ Accessibilité

- Navigation au clavier
- ARIA labels
- Contraste de couleurs optimal
- Support des lecteurs d'écran
- Reduced motion pour utilisateurs sensibles

## 📊 Performance

- CSS et JS optimisés
- Animations performantes (GPU)
- Debouncing pour les événements scroll
- Intersection Observer pour animations
- Pas de dépendances externes lourdes

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #0f172a;
    --accent-color: #f59e0b;
}
```

### Contenu
Éditez directement dans `index.html` pour modifier:
- Textes
- Services
- Coordonnées
- Meta tags

## 📝 To-Do pour Production

- [ ] Ajouter un vrai backend pour le formulaire
- [ ] Créer un favicon personnalisé
- [ ] Ajouter des images optimisées
- [ ] Configurer Google Analytics
- [ ] Créer sitemap.xml
- [ ] Créer robots.txt
- [ ] Tester avec Google Lighthouse
- [ ] Configurer reCAPTCHA
- [ ] Ajouter Service Worker pour PWA

## 🐛 Support Navigateurs

- Chrome/Edge: Dernières versions
- Firefox: Dernières versions
- Safari: Dernières versions
- IE11: Non supporté (recommandé d'upgrader)

## 📄 Licence

© 2025 MCL TRANS SRL. Tous droits réservés.

## 👤 Contact

**MCL TRANS SRL**
- Email: Info@mcltrans.be
- Téléphone: +32 43 96 03 03
- Adresse: Rue Hector Denis 5, 4340 Awans, Belgium
