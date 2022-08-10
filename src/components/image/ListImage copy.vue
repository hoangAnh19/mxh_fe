<lightgallery :settings="{ speed: 500, plugins: plugins }">
        <a
            class="gallery-item"
            :href="config.url.image + user.avatar"
            data-lg-size="1406-1390"
        >
            <img
                class="img-responsive"
                :src="config.url.image + user.avatar"
                width="400"
                height="500"
            />
        </a>
 </lightgallery>
