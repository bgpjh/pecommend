package com.perfume.perfumeservice.service.perfume;

import com.perfume.perfumeservice.domain.perfume.Note;
import com.perfume.perfumeservice.domain.perfume.NoteRepository;
import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.perfume.PerfumeRepository;
import com.perfume.perfumeservice.dto.perfume.NoteResponseDto;
import com.perfume.perfumeservice.dto.perfume.PerfumeResponseDto;
import com.perfume.perfumeservice.exception.perfume.PerfumeNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.criteria.internal.predicate.LikePredicate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class PerfumeServiceImpl  implements PerfumeService {

    private final PerfumeRepository perfumeRepository;


    @Override
    public List<PerfumeResponseDto> getListAll() {
        List<Perfume> perfumeList = perfumeRepository.findAllByOrderByKoName();

        List<PerfumeResponseDto> dtoList = new LinkedList<>();

        for (Perfume p: perfumeList){
             dtoList.add(PerfumeResponseDto.from(p));
        }
        return dtoList;
    }

    @Override
    public List<PerfumeResponseDto> getListKeyword(String keyword) {
        // keyword가 한글인지 영어(숫자)인지 확인해서 검색하기

        List<Perfume> perfumeListKo = perfumeRepository.findByKoNameLike("%"+keyword+"%");
        List<Perfume> perfumeListEn = perfumeRepository.findByEnNameLike("%"+keyword+"%");

        // 중복 제거가 안되고 있었슴 ㅋ

        Set<PerfumeResponseDto> dtoList = new LinkedHashSet<>();

        for(Perfume p: perfumeListKo){
            dtoList.add(PerfumeResponseDto.from(p));
        }
        for(Perfume p: perfumeListEn){
            dtoList.add(PerfumeResponseDto.from(p));
        }

        // 중복 제거
        // 정렬 안하고 내보냄 => 필요하면 정렬하는 코드 추가 필요
        return new ArrayList<>(dtoList);

    }
    @Override
    public List<PerfumeResponseDto> getListKoKeyword(String keyword) {
        List<Perfume> perfumeListKo = perfumeRepository.findByKoNameLike("%"+keyword+"%");
        List<PerfumeResponseDto> dtoList = new LinkedList<>();
        for(Perfume p: perfumeListKo){
            dtoList.add(PerfumeResponseDto.from(p));
        }
        // 정렬 안하고 내보냄 => 필요하면 정렬하는 코드 추가 필요
        return new ArrayList<>(dtoList);
    }

    @Override
    public List<PerfumeResponseDto> getListEnKeyword(String keyword) {
        List<Perfume> perfumeListEn = perfumeRepository.findByEnNameLike("%"+keyword+"%");
        List<PerfumeResponseDto> dtoList = new LinkedList<>();
        for(Perfume p: perfumeListEn){
            dtoList.add(PerfumeResponseDto.from(p));
        }
        // 정렬 안하고 내보냄 => 필요하면 정렬하는 코드 추가 필요
        return new ArrayList<>(dtoList);
    }


    @Override
    public PerfumeResponseDto getPerfume(Long id) {
        Perfume perfume = perfumeRepository.findById(id).orElseThrow(PerfumeNotFoundException::new);
        return PerfumeResponseDto.from(perfume);
    }



}
