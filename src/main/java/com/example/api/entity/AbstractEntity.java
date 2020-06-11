package com.example.api.entity;

import java.time.LocalDateTime;

import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public abstract class AbstractEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@CreatedDate
	@JsonProperty
	private LocalDateTime createdDate;
	
	@CreatedBy
	@JsonProperty
	private String createdBy;
	
	@LastModifiedDate
	@JsonProperty
	private LocalDateTime modifiedDate;
	
	@LastModifiedBy
	@JsonProperty
	private String modifiedBy;
}
