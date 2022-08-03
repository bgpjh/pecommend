package com.perfume.perfumeservice.service.perfume;

import com.perfume.perfumeservice.domain.perfume.Note;
import com.perfume.perfumeservice.domain.perfume.NoteRepository;
import com.perfume.perfumeservice.domain.perfume.Perfume;
import com.perfume.perfumeservice.domain.perfume.PerfumeRepository;
import com.perfume.perfumeservice.dto.perfume.NoteResponseDto;
import com.perfume.perfumeservice.dto.perfume.PerfumeResponseDto;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NoteServiceImpl implements NoteService{

    private final PerfumeRepository perfumeRepository;
    private final NoteRepository noteRepository;

    @Override
    public List<NoteResponseDto> getNotes(Long id) { // 향수 id로 노트 정보 가져오기
        Perfume perfume = perfumeRepository.findById(id).orElseThrow(null);
        List<Note> notes = perfume.getNotes();
        List<NoteResponseDto> dtolist = new LinkedList<>();
        for (Note n : notes) {
            dtolist.add(NoteResponseDto.from(n));
        }
        return dtolist;
    }

//    @Override
//    public Perfume getNotes(Long id) { // 향수 id로 검색해서 나온 note 리스트 반환
//        Perfume perfume = perfumeRepository.findById(id).orElseThrow(null);
//        return perfume;
//    }

}
