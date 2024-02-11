package com.app.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class RestItemId {
	@Column(name = "rest_id")
    private Integer restId;
	
    @Column(name = "item_id")
    private Integer itemId;

    // Getters and setters for restId and itemId

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RestItemId that = (RestItemId) o;
        return restId.equals(that.getRestId()) && itemId.equals(that.getItemId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(restId, itemId);
    }
}
