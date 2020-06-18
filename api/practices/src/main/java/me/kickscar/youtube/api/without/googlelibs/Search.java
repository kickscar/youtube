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
    private static final String QUERY_TERM = "몰디브";
    private static final long NUMBER_OF_VIDEOS_RETURNED = 25;

    public static void main(String[] args) throws Throwable {

        // 1. api key
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword("KICKSCAE_ME");
        encryptor.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        encryptor.setIvGenerator(new RandomIvGenerator());

        Properties properties = new EncryptableProperties(encryptor);
        encryptor.setPassword("KICKSCAE_ME");
        encryptor.setAlgorithm("PBEWithHMACSHA512AndAES_256");
        encryptor.setIvGenerator(new RandomIvGenerator());

        properties.load(Search.class.getResourceAsStream("/" + PROPERTIES_FILENAME));
        String apiKey = properties.getProperty("youtube.apikey");

        // 2. sending request
        String spec = new StringBuilder("https://www.googleapis.com/youtube/v3/search")
                .append("?")
                .append("part=").append("snippet").append("&")
                .append("order=").append("viewCount").append("&")
                .append("maxResults=").append(NUMBER_OF_VIDEOS_RETURNED).append("&")
                .append("q=").append(QUERY_TERM).append("&")
                .append("type=").append("video").append("&")
                .append("videoDefinition=").append("high").append("&")
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