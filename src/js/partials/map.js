ymaps.ready(init);
      var myMap,
          myPlacemark;

      function init(){
        myMap = new ymaps.Map("map", {
                center: [55.671686, 37.292840],
                zoom: 16,
                controls : []
        });

        myPlacemark = new ymaps.Placemark([55.671686, 37.292840], {
                    hintContent: 'Krasivo.org',
                    balloonContent: 'Krasivo.org',
        },
        {
            preset: 'islands#redIcon'
        });
        myMap.behaviors.disable(['scrollZoom']);
        myMap.geoObjects.add(myPlacemark);
    }

    var myPlacemark = new ymaps.Placemark([55.8, 37.6], {}, {
        preset: 'islands#redIcon'
    });