document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');

    // posts.json dosyasını yükle
    fetch('js/posts.json')
        .then(response => response.json())
        .then(posts => {
            if (posts.length === 0) {
                blogContainer.innerHTML = '<p>Henüz yayınlanmış bir yazı bulunmuyor.</p>';
                return;
            }
            
            // Her bir post için HTML oluştur ve sayfaya ekle
            posts.forEach(post => {
                // Paragrafları <p> etiketlerine çevir
                const paragraphs = post.content.map(p => `<p>${p}</p>`).join('');

                // Etiketleri <span> etiketlerine çevir
                const tags = post.tags.map(t => `<span class="tag">${t}</span>`).join('');

                const postHTML = `
                    <article class="blog-post">
                        <h2>${post.title}</h2>
                        <span class="date">${post.date}</span>
                        ${paragraphs}
                        <div class="tags">
                            ${tags}
                        </div>
                    </article>
                `;
                
                blogContainer.innerHTML += postHTML;
            });
        })
        .catch(error => {
            console.error('Blog yazıları yüklenirken bir hata oluştu:', error);
            blogContainer.innerHTML = '<p>Yazılar yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>';
        });
});