import React from 'react';

export default function CourseCardSkeleton() {
  return (
    <div className="course-card-wrapper">
      <div className="course-card skeleton-card">
        {/* Thumbnail Skeleton */}
        <div className="card-thumb-area skeleton-box skeleton-thumb">
          <div className="skeleton-shimmer"></div>
        </div>

        {/* Card Body Skeleton */}
        <div className="card-body">
          {/* Title Skeleton - 2 lines */}
          <div className="skeleton-title-group">
            <div className="skeleton-box skeleton-line line-full">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-box skeleton-line line-two-thirds">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>

          {/* Instructor Skeleton */}
          <div className="skeleton-box skeleton-line line-half">
            <div className="skeleton-shimmer"></div>
          </div>

          {/* Badges Row Skeleton */}
          <div className="card-badges-row skeleton-badges-row">
            <div className="skeleton-box skeleton-pill pill-sm">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-box skeleton-pill pill-xs">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-box skeleton-pill pill-md">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>

          {/* Card Footer Skeleton */}
          <div className="card-footer-row skeleton-footer-row">
            <div className="skeleton-box skeleton-price">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-box skeleton-btn">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
