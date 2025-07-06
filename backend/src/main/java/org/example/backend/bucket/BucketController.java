package org.example.backend.bucket;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/buckets")
public class BucketController {
    private BucketService bucketService;

    public BucketController(BucketService bucketService) {
        this.bucketService = bucketService;
    }

    @PostMapping
    public ResponseEntity<Bucket> createBucket() {
        Bucket bucket = bucketService.createBucket();
        return ResponseEntity.ok(bucket);
    }

}
