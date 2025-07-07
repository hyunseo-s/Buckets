package org.example.backend.bucket;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BucketController {
    private BucketService bucketService;

    public BucketController(BucketService bucketService) {
        this.bucketService = bucketService;
    }

    @PostMapping("/buckets")
    public ResponseEntity<Bucket> createBucket() {
        Bucket bucket = bucketService.createBucket();

        return ResponseEntity.ok(bucket);
    }

}
