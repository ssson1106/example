package com.example.myapp.entity;

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
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuditngEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	//날짜오류나면 이거 알아보자
	//@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	//@JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
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
