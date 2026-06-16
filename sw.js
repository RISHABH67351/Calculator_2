
console.log("ready to work")


let cahceData = 'calculatorAppByAshish';


// self.addEventListener("install")

// // // Setting file into cache -->
this.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(cahceData).then((cach) => {
            cach.addAll([
                "/",
                "/index.html",
                "/style.css",
                "/script.js",
                "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
                "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
                "https://fonts.googleapis.com/css2?family=Kenia&family=Public+Sans&family=Roboto&family=Tourney:ital,wght@0,700;1,100&display=swap",
                "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bodoni+Moda:opsz@6..96&family=Handlee&family=Kosugi+Maru&display=swap",

            ])

        }).catch((err) => {
            console.error(err)
        })
    )
})


// // Get files into cache -->


this.addEventListener("fetch", (event) => {

    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((res) => {

                if(res){
                    return res
                }
                // return res || fetch(event.request);
                // return res
                // // All 3 are working fine --->
            }).catch((err) => {
                console.error(err)
            })
        )
    }

})




