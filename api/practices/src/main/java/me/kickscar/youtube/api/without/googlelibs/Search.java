package me.kickscar.youtube.api.without.googlelibs;

import org.codehaus.jackson.map.ObjectMapper;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.jasypt.properties.EncryptableProperties;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Search {

    private static final String PROPERTIES_FILENAME = "youtube.properties";

    public static void main(String[] args) throws Throwable {

        // 1. api key
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword("KICKSCAE_ME");
        encryptor.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        encryptor.setIvGenerator(new RandomIvGenerator());

        Properties properties = new EncryptableProperties(encryptor);
        properties.load(Search.class.getResourceAsStream("/" + PROPERTIES_FILENAME));
        String apiKey = properties.getProperty("youtube.apikey");

        // 2. sending request
        String spec = new StringBuilder("https://www.googleapis.com/youtube/v3/search")
                .append("?")

                //// REQUIRED //////////////////////////////////////////////////////////////////////////////////////////

                .append("part=").append("snippet").append("&")                          // set value to only snippet


                //// FILTER( 0 or 1) ///////////////////////////////////////////////////////////////////////////////////

                // .append("forContentOwner=").append(false).append("&")
                // .append("forDeveloper=").append(false).append("&")
                // .append("forMine=").append(false).append("&")
                // .append("relatedToVideoId=").append("").append("&")


                //// OPTIONAL PARAMETERS ///////////////////////////////////////////////////////////////////////////////

                // .append("channelId=").append("").append("&")

                // .append("channelType=").append("any").append("&")                    // any(default)
                                                                                        // show

                // .append("eventType=").append("any").append("&")                      // completed(completed broadcasts)
                                                                                        // live(active broadcasts)
                                                                                        // upcoming(upcoming broadcasts)

                // .append("location=").append("(37.42307,-122.08427)").append("&")     // (latitude, longitude)
                // .append("locationRadius=").append("1000km").append("&")              // distance m/km/ft/mi

                .append("maxResults=").append(50).append("&")                           // 0 ~ 50, 5(default)

                //.append("onBehalfOfContentOwner=").append("").append("&")

                .append("order=").append("date").append("&")                            // date, viewCount, rating,
                                                                                        // relevance(default), title,
                                                                                        // videoCount(for channel search)

                //.append("pageToken=").append("").append("&")                         // token for paging

                .append("publishedAfter=").append("2019-01-01T00:00:00Z").append("&")   // from datetime
                .append("publishedBefore=").append("2019-12-31T23:59:59Z").append("&")  // to datetime
                                                                                        // ref) RFC 3339 formatted date-time

                .append("q=").append("여행%7C배낭%20%2D일본").append("&")                   // query term to search for
                                                                                        // 여행|배낭 -일본
                                                                                        // videos matching either "여행" or "배낭" but not "일본"
                                                                                        // | escaped: %7C
                                                                                        // space escaped : %20
                                                                                        // -  escaped : %2D

                .append("type=").append("video").append("&")                            // video, channel, playlist

                .append("safeSearch=").append("moderate").append("&")                   // moderate(default)
                                                                                        // nonde
                                                                                        // strict

                .append("regionCode=").append("KR").append("&")                         // value to ISO 3166-1 alpha-2 country code
                                                                                        // https://www.iso.org/obp/ui/#search

                .append("relevanceLanguage=").append("ko").append("&")                  // value to ISO 639-1 two-letter language code
                                                                                        // https://www.loc.gov/standards/iso639-2/php/code_list.php

                .append("videoCaption=").append("any").append("&")                      // any(both have or not)
                                                                                        // closedCaption(only have)
                                                                                        // none(only not)
                                                                                        // must set the type parameter's value to 'video'

                //.append("videoCategoryId=").append("").append("&")                    // based on category id
                                                                                        // must set the type parameter's value to 'video'

                .append("videoDefinition=").append("any").append("&")                   // any, high, standard
                                                                                        // must set the type parameter's value to 'video'

                .append("videoDimension=").append("any").append("&")                    // 2D, 3D, any(default)
                                                                                        // must set the type parameter's value to 'video'

                .append("videoDuration=").append("any").append("&")                     // long(20~ mins),
                                                                                        // medium(4~20 mins),
                                                                                        // short(~4 mins),
                                                                                        // any(default)
                                                                                        // must set the type parameter's value to 'video'

                .append("videoEmbeddable=").append("any").append("&")                   // any(default)
                                                                                        // true(only Embeddable)
                                                                                        // must set the type parameter's value to 'video'

                .append("videoLicense=").append("any").append("&")                      // any(default)
                                                                                        // creativeCommon(Creative Common License)
                                                                                        // youtube(Standard Youtube License)
                                                                                        // must set the type parameter's value to 'video'

                .append("videoSyndicated=").append("any").append("&")                   // any(default)
                                                                                        // true(only syndicated video)
                                                                                        // must set the type parameter's value to 'video'

                .append("videoType=").append("any").append("&")                         // episode,
                                                                                        // movie
                                                                                        // any(default)
                                                                                        // must set the type parameter's value to 'video'

                //// API KEY ///////////////////////////////////////////////////////////////////////////////////////////

                .append("key=").append(apiKey)
                .toString();

        HttpURLConnection httpURLConnection = (HttpURLConnection)(new URL(spec).openConnection());
        httpURLConnection.setRequestMethod("GET");
        httpURLConnection.setRequestProperty("Accept", "application/json");

        // 3. processing response
        int responseCode = httpURLConnection.getResponseCode();
        if(responseCode != HttpURLConnection.HTTP_OK) {
            String responseMessage = httpURLConnection.getResponseMessage();
            System.out.println(responseCode + " " + responseMessage);
            return;
        }

        Map map = new ObjectMapper().readValue(new InputStreamReader(httpURLConnection.getInputStream(), "UTF-8"), HashMap.class);
        System.out.println(map);
    }
}